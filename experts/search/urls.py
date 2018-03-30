from django.urls import path
from search.views import ExpertListView

urlpatterns = [
    path('search/', ExpertListView.as_view()),
]
