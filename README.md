# Experts list
Three days test prototype project

## Approach
Implement a Django backend (Python 3.x) REST API to serve frontend ReactJS, Bootstrap, SCSS one page experts search small prototype.

## Environment
```
Ubuntu 17.04
Python 3.6.4
```

## Setup development 

### Install python 3.6.4 with pyenv

Follow the  Installation / Update / Uninstallation at [https://github.com/yyuu/pyenv-installer#installation--update--uninstallation](https://github.com/yyuu/pyenv-installer#installation--update--uninstallation)

```
$ pyenv update
```
Install python 3.6.4
```
$ pyenv install 3.6.4
$ pyenv global 3.6.4
$ pyenv versions
  system
* 3.6.4 (set by /home/moreno/.pyenv/version)
$ python -V
Python 3.6.4
```

### Virtual Environment

```
$ python -m venv env
$ . env/bin/activate
```

### (optional) PIP Instalation
[Installing PIP](https://pip.pypa.io/en/stable/installing/)

### Install Requirements

```
$ python -m venv env
$ . env/bin/activate
(env) $ pip install --upgrade pip
(env) $ pip install -r requirements.txt
```

### Run django server
```
(env) experts$ python manage.py runserver
```


### Run node server (other terminal)
```
frontend$ npm start
```
![Frontend](https://github.com/morenopc/experts/raw/master/frontend/public/img/2018-04-11-Selection-001.jpg "frontend")
