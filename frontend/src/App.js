import React, { Component } from 'react';
import plus_ico from './svg/plus.svg'
import star_icon from './svg/star.svg';
import startransp_icon from './svg/startransp.svg';
import pencil_icon from './svg/pencil.svg';
import trashcan_icon from './svg/trashcan.svg';


class App extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOrdering = this.handleOrdering.bind(this);
    this.handleEditLoad = this.handleEditLoad.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state  = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      base_url: "http://localhost:8000/",
      url: "http://localhost:8000/experts/",
      expert: {
        id: 0,
        name: '',
        title: '',
        education: '',
        description_title: '',
        description: '',
        hourly_rate: 0,
      }
    }
  }

  componentDidMount = () => {
    this.fetchJsonData();
  }

  handleRefresh = (url) => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.fetchJsonData(url);
      }
    );
  }

  fetchJsonData = (url)  => {
    var local_url = url;
    if (typeof local_url === 'undefined') {
      local_url = this.state.url;
    }
    

    this.setState({ loading: true });

    fetch(local_url)
      .then(results => results.json())
      .then(data => {
        this.setState({
          data: data,
          error: null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        console.error('#GET Error', error.toString());
        this.setState({ error, loading : false });
      })
  }

  handleSubmit(event) {

    event.preventDefault();

    fetch(this.state.url, {
      method: 'POST',
      body: JSON.stringify({
        name: event.target.name.value,
        title: event.target.title.value,
        education: event.target.education.value,
        description_title: event.target.description_title.value,
        description: event.target.description.value,
        hourly_rate: event.target.hourly_rate.value}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(data => {
      this.handleRefresh();
    })
    .catch(error => {
      console.error('#GET Error', error.toString());
      this.setState({ error, loading : false });
    })
  }

  handleOrdering(event) {
    event.preventDefault();
    this.handleRefresh(
      this.state.url + '?ordering=' + event.target.value)
  }

  handleEditLoad (id, event) {

    console.log('EditLoad');
    console.log(id);

    fetch(this.state.url + id + '/')
      .then(results => results.json())
      .then(data => {
        this.setState({
          expert: data
        });
      })
      .catch(error => {
        console.error('#GET Error', error.toString());
        this.setState({ error, loading : false });
      })
  }

  handleEdit(id, event) {

    event.preventDefault();

    console.log('Edit');
    console.log(id);

    fetch(this.state.url + id + '/', {
      method: 'PUT',
      body: JSON.stringify({
        name: this.state.expert.name,
        title: this.state.expert.title,
        education: this.state.expert.education,
        description_title: this.state.expert.description_title,
        description: this.state.expert.description,
        hourly_rate: this.state.expert.hourly_rate}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(data => {
      this.handleRefresh();
    })
    .catch(error => {
      console.error('#GET Error', error.toString());
      this.setState({ error, loading : false });
    })
  }

  handleDelete(id, event) {

    event.preventDefault();

    fetch(this.state.url + id + '/', {
      method: 'PUT',
      body: JSON.stringify({is_active: false}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(data => {
      this.handleRefresh();
    })
    .catch(error => {
      console.error('#GET Error', error.toString());
      this.setState({ error, loading : false });
    })
  }

  contentHeader = ()  => {
    return (
      <div className="row">
        <div className="col"></div>
        <div className="col-sm-10">
          <div className="row">
            <div className="col-7">
              <p><small><strong>{this.state.data.length} experts</strong> matching your search</small></p>
            </div>
            <div className="col-5 text-right">
              <p><small>sort by 
                <select onChange={this.handleOrdering} className="custom-select col-md-5 border-0 text-green font-weight-bold" defaultValue="-popularity">
                  <option value="name">Name</option>
                  <option value="-popularity">Popularity</option>
                  <option value="hourly_rate">Hourly Rate</option>
                </select>&nbsp;
                <button type="button" className="btn btn-green-light" data-toggle="modal" data-target="#addFormModal"><img className="icon" src={plus_ico} alt="add" /></button>
              </small></p>
            </div>
          </div>
        </div>
        <div className="col"></div>
      
        <div className="modal fade" id="addFormModal" tabIndex="-1" role="dialog" aria-labelledby="addFormModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addFormModalLabel">Add new expert</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" id="name"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" name="title" id="title" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="education">Education</label>
                    <input type="text" className="form-control" name="education" id="education"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description_title">Description Title</label>
                    <input type="text" className="form-control" name="description_title" id="description_title" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" name="description" id="description" rows="3"></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="hourly_rate">Hourly Rate</label>
                    <input type="number" className="form-control" name="hourly_rate" id="hourly_rate" />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  resultsContent = () => {
    return (<div>
      {this.state.data.map((expert) => {
        return (<div key={expert.id} className="row">
          <div className="col"></div>
          <div className="col-sm-10">
            <div className="row box-shadow-green search-card">
              <div className="col-sm-2">
                <img style={{ height: 70, width: 70 }} className="rounded-circle box-shadow-green" src={expert.picture} alt="" />
              </div>
              <div className="col-sm-8">
                <h6 className="text-green-dark">{expert.name}</h6>
                {[0, 1, 2, 3, 4].map((star, i) => {
                  if (expert.popularity > star) {
                    return <img key={i} className="icon" src={star_icon} alt="star" />
                  }
                  else {
                    return <img key={i} className="icon" src={startransp_icon} alt="star" />
                  }
                })}
                <small> {expert.hours_taught} hours taught &bull; {expert.title}, {expert.education}</small>
                <p>
                  <strong>{expert.description_title}</strong><br />
                  <small>{expert.description}</small>
                </p>
              </div>
              <div className="col-sm-2 actions">
                <p className="text-green-light"><small>€ <span className="h4">{expert.hourly_rate}</span> /h</small></p>
                <button data-toggle="modal" data-target="#editFormModal" onClick={(e) => this.handleEditLoad(expert.id, e)} value={expert.id} type="button" className="btn btn-success"><img value={expert.id} className="icon" src={pencil_icon} alt="" /></button>&nbsp;
                <button onClick={(e) => this.handleDelete(expert.id, e)} value={expert.id} type="button" className="btn btn-danger"><img value={expert.id} className="icon" src={trashcan_icon} alt="" /></button>
              </div>
            </div>
          </div>
          <div className="col"></div>
          <div className="modal fade" id="editFormModal" tabIndex="-1" role="dialog" aria-labelledby="editFormModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editFormModalLabel">Add new expert</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => this.handleEdit(this.state.expert.id, e)}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" id="name" value={this.state.expert.name} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" name="title" id="title" value={this.state.expert.title} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="education">Education</label>
                    <input type="text" className="form-control" name="education" id="education" value={this.state.expert.education} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description_title">Description Title</label>
                    <input type="text" className="form-control" name="description_title" id="description_title" value={this.state.expert.description_title}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" name="description" id="description" rows="3" value={this.state.expert.description}></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="hourly_rate">Hourly Rate</label>
                    <input type="number" className="form-control" name="hourly_rate" id="hourly_rate" value={this.state.expert.hourly_rate}/>
                  </div>
                  <button type="submit" className="btn btn-primary">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>);
        })
      }
    </div>);
  }

  contentFooter = () => {
    return (
      <div className="row">
        <div className="col-sm-12 text-center">
          <p><small>You have viewed <strong>{this.state.data.length} of {this.state.data.length} experts</strong></small></p><br />
          <button type="button" className="btn btn-green-light">LOAD MORE</button>
        </div>
      </div>
    );
  };

  render() {
    return (<div>
      {this.contentHeader()}
      {this.resultsContent()}
      {this.contentFooter()}
    </div>);
  }
}

export default App;
