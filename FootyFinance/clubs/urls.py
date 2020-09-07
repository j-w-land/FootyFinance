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

# router.register('api/clubs', ClubViewSet, 'clubs')
# router.register('api/fsdata', FinancialStatementFactViewSet, 'fsdata')
# router.register('', api_root, "")
# router.register('fsdata/<int:pk>/highlight/', FSDataHighlight, 'fsdata')


# urlpatterns = router.urls

# path('', views.api_root)
# path('api/fsdata/<int:pk>/', FSDataHighlight.as_view())
'''
fs_all_data = FinancialStatementFactViewSet.as_view({
    'get': 'list'
})

get_clubs = ClubViewSet.as_view({
    'get': 'list'
})

urlpatterns = format_suffix_patterns([
    # path('', views.api_root),
    path('api/fsdata/', fs_all_data, name='fs_all_data'),
    path('api/clubs/', get_clubs, name='clubs')
    # path('', views.api_root),
    # path('snippets/<int:pk>/highlight/', views.SnippetHighlight.as_view()),
])
'''
# urlpatterns = format_suffix_patterns(urlpatterns)

''',
    path('snippets/<int:pk>/',
        views.SnippetDetail.as_view(),
        name='snippet-detail'),
    path('snippets/<int:pk>/highlight/',
        views.SnippetHighlight.as_view(),
        name='snippet-highlight'),
    path('users/',
        views.UserList.as_view(),
        name='user-list'),
    path('users/<int:pk>/',
        views.UserDetail.as_view(),
        name='user-detail')'''
