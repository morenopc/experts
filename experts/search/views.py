from django.views.generic import ListView
from search.models import Expert


class ExpertListView(ListView):
    model = Expert
    queryset = model._default_manager.filter(is_active=True)
    context_object_name = 'experts'
    template_name = "search.html"
    sort_by_list = [
        'name', 'popularity', 'hours_taught',
        'hourly_rate', 'created_at', 'updated_at']

    def sorting(self, order_by):
        reverse_order = ['popularity', 'hours_taught']
        if order_by and order_by in self.sort_by_list:
            if order_by in reverse_order:
                order_by = '-' + order_by
            self.object_list = self.object_list.order_by(order_by)

    def get(self, request, *args, **kwargs):

        self.object_list = self.get_queryset()

        # sorting
        self.sorting(request.GET.get('sort'))

        allow_empty = self.get_allow_empty()
        if not allow_empty:
            # When pagination is enabled and object_list is a queryset,
            # it's better to do a cheap query than to load the unpaginated
            # queryset in memory.
            if self.get_paginate_by(self.object_list) is not None and hasattr(self.object_list, 'exists'):
                is_empty = not self.object_list.exists()
            else:
                is_empty = len(self.object_list) == 0
            if is_empty:
                raise Http404(_("Empty list and '%(class_name)s.allow_empty' is False.") % {
                    'class_name': self.__class__.__name__,
                })
        context = self.get_context_data()
        return self.render_to_response(context)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['sort_by_list'] = self.sort_by_list

        return context
