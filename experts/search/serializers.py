from search.models import Expert
from rest_framework import serializers


class ExpertModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expert
        fields = ('__all__')
