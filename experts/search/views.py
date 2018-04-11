from rest_framework import viewsets, filters
from search.models import Expert
from search.serializers import ExpertModelSerializer


class ExpertModelViewSet(viewsets.ModelViewSet):

    queryset = Expert.objects.filter(is_active=True)
    serializer_class = ExpertModelSerializer
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('name', 'popularity', 'hourly_rate')
    ordering = ('-popularity',)
