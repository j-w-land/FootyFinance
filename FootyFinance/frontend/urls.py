from django.urls import path, include, re_path
from . import views
# from clubs.urls import router
from clubs.api import ClubViewSet, FinancialStatementFactViewSet, FinancialStatementLineViewSet
from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'^api/fsdata', FinancialStatementFactViewSet)
# router.register(r'^api/fslis', FinancialStatementLineViewSet)
# router.register(r'^api/clubs', ClubViewSet, basename='clubs')
# router.register(r'api/clubs', ClubViewSet, basename='clubs')

# router.register(r'^clubs', ClubViewSet, basename='clubs')
# router.register(r'clubs', ClubViewSet, basename='clubs')
# router.register(r'^/clubs', ClubViewSet, basename='clubs')
# router.register(r'/clubs', ClubViewSet, basename='clubs')
# router.register(r'fsdata', FinancialStatementFactViewSet)
# router.register(r'fslis', FinancialStatementLineViewSet)

# routerFront = routers.DefaultRouter()
# routerFront.register(r'')

urlpatterns = [
    # path(r'^', views.index),

    path(r'api/', include('clubs.urls')),  # TOIMII
    # re_path(r'api/.*', include(router.urls)),
    # re_path(r'api/', include(router.urls)),
    # re_path(r'api/.*', include(router.urls)),

    # re_path(r'', views.index, name='index'),
    re_path(r'^(?P<new_path>([^/]+/)*)$', views.index, name='index'),
    # path(r'club', views.index),
    # path(r'club/', views.index),

    # path(r'', views.index),
    # path(r'^*', views.index),
    # path(r'/DDD', views.index),
    # re_path('', views.index),
    # path(r'^', views.index),



]
# path(r'.*', views.index),

# path(r'.*', views.index),
# re_path(r'^api/clubs', include(router.urls))

# re_path(r'^api/clubs', views.api)
# re_path(r'^(?:.*)/?$', views.index),
# path('', include('clubs.urls'))

'''

from rest_framework import routers
from .api import ClubViewSet, FinancialStatementFactViewSet, FinancialStatementLineViewSet
from .views import FSDataHighlight, api_root
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from clubs import views
from clubs.views import FSDataAll, get_facts
from rest_framework import renderers

router = routers.DefaultRouter()
router.register(r'api/fsdata', FinancialStatementFactViewSet)
router.register(r'api/fslis', FinancialStatementLineViewSet)

# router.register(r'api/clubs', ClubViewSet, basename='clubs')
# router.register(r'api/clubs*', ClubViewSet, basename='clubs')
router.register(r'^api/clubs', ClubViewSet, basename='clubs')
# router.register(r'^api/clubs', ClubViewSet, basename='clubs')


urlpatterns = [
    path('', include(router.urls)),
]
'''


''' toimii:

    path('', views.index),
    re_path(r'^api/', include(router.urls)),
    path(r'/^', views.index),
    '''
