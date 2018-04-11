from django.urls import path, include
from rest_framework import routers
from search.views import ExpertModelViewSet

router = routers.DefaultRouter()
router.register(r'experts', ExpertModelViewSet)

urlpatterns = [
    path('', include(router.urls))
]
