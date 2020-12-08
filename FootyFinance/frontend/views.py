from django.shortcuts import render
from django.urls import include, re_path, path
from clubs.urls import router


def index(request, new_path):
    print("frontend index: ")
    print(new_path)
    if(new_path[0:new_path.find('/')] == 'api'):
        print("API FIND!!!")
        # re_path(r'', include('clubs.urls')),
    else:
        print("NOT_API!!!!!")
        print(request)
        return render(request, 'frontend/index.html')
    # path_items = path.split('/')
    print(request)
    return render(request, 'frontend/index.html')


def api(request):
    print("frontend API: ")
    print(request)
    # re_path(r'^api/clubs', include(router.urls))
