from django.contrib import admin
from search.models import Expert


class ExpertAdmin(admin.ModelAdmin):
    pass
admin.site.register(Expert, ExpertAdmin)
