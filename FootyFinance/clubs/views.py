from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import renderers
from rest_framework import generics
from rest_framework.views import APIView

from clubs.models import FinancialStatementFact
from clubs.searilizers import FinancialStatementFactSerializer

print("API_VIEWS_PY")


@api_view(['GET'])
def get_facts(request, format=None):
    if request.method == 'GET':
        facts = FinancialStatementFact.objects.all()
        serializer = FinancialStatementFactSerializer(facts, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'fsdata': reverse('fs_all_data', request=request, format=format)
    })


class FSDataHighlight(generics.GenericAPIView):
    queryset = FinancialStatementFact.objects.all()
    renderer_classes = [renderers.StaticHTMLRenderer]

    def get(self, request, *args, **kwargs):
        fact = self.get_object()
        return Response(fact.highlighted)


class FSDataAll(generics.ListCreateAPIView):
    """
    List all FSDATA, or create a new snippet.
    """
    queryset = FinancialStatementFact.objects.all()
    serializer_class = FinancialStatementFactSerializer
    '''

    def get(self, request, format=None):
        fsdata = FinancialStatementFact.objects.all()
        serializer = FinancialStatementFactSerializer(fsdata, many=True)
        return Response(serializer.data)
        '''
    '''
    def post(self, request, format=None):
        serializer = SnippetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)'''
