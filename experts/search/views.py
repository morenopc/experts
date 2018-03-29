from django.views.generic import ListView
from search.models import Expert


class ExpertListView(ListView):
    model = Expert
    template_name = "search.html"
