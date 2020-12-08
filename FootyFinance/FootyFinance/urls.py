from django.urls import path, include, re_path
from django.views.generic import TemplateView


urlpatterns = [

    # re_path(r".*", include('frontend.urls')),
    # re_path(r'.*', include('frontend.urls')),
    # path('', TemplateView.as_view(template_name="index.html")),  # setUpRouting

    # re_path(r'api/', include('frontend.urls')),
    # re_path(r'', include('frontend.urls')),
    path(r'', include('frontend.urls')),
    # re_path(r'', include('frontend.urls')),
    # re_path(r'.*', include('frontend.urls')),
    # re_path(r'/', include('frontend.urls')),
    # re_path(r'/^', include('frontend.urls')),
    # re_path(r'clubX/', include('frontend.urls')),
    # re_path(r'', include('frontend.urls')),





    # re_path(r'^.*', include('frontend.urls')),
    # path(r'', include('clubs.urls')),
    # re_path(r'^api/', include('frontend.urls')),
    # path(r'api/', include('clubs.urls')),
    # re_path(r'^api/', include('clubs.urls')),
    # re_path(r'^', include('frontend.urls')),

    # path(r'^(?:.*)/?', include('frontend.urls')),
    # re_path(r'^(?:.*)/?$', include('frontend.urls')),

]

''' toimii:

    re_path(r'^api/', include('frontend.urls')),
    re_path(r'/', include('frontend.urls')),
    re_path(r'/^', include('frontend.urls')),
    re_path(r'', include('frontend.urls')),
    '''
