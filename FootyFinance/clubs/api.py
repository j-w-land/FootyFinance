from clubs.models import Club, FinancialStatementFact, FinancialStatementLine
from rest_framework import viewsets, permissions
from .searilizers import ClubSerializer, FinancialStatementFactSerializer, FinancialStatementLineSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import renderers
from rest_framework.filters import SearchFilter, OrderingFilter
# from django_filters import rest_framework as filters


def is_valid_queryparam(param):
    return param != '' and param is not None


def filter(kwargs):
    id_exact_query = kwargs.get("id", "")
    # print(id_exact_query)
    qs = FinancialStatementFact.objects.all()
    # id_exact_query = ""
    fiscal_year_query = ""
    '''
    fiscal_year_query = request.GET.get('fiscal_year')
    fiscal_period_query = request.GET.get('fiscal_period')
    start_date_query = request.GET.get('start_date')
    end_date_query = request.GET.get('end_date')
    amount_query = request.GET.get('amount')
    club_id_query = request.GET.get('club_id')
    financial_statement_line_id_query = request.GET.get('financial_statement_line_id')
    period_length_months_query = request.GET.get('period_length_months')
    reporting_standard_query = request.GET.get('reporting_standard')
    reporting_standard_query = request.GET.get('currency')
    financial_statement_type_query = request.GET.get('financial_statement_type')'''

    if is_valid_queryparam(id_exact_query):
        qs = qs.filter(id=id_exact_query)

    if is_valid_queryparam(fiscal_year_query):
        qs = qs.filter(fiscal_year=fiscal_year_query)
    '''
    if is_valid_queryparam(fiscal_period_query):
        qs = qs.filter(fiscal_period=fiscal_period_query)

    if is_valid_queryparam(start_date_query):
        qs = qs.filter(start_date=start_date_query)

    if is_valid_queryparam(end_date_query):
        qs = qs.filter(end_date=end_date_query)

    if is_valid_queryparam(amount_query):
        qs = qs.filter(amount=amount_query)

    if is_valid_queryparam(club_id_query):
        qs = qs.filter(club_id=club_id_query)

    if is_valid_queryparam(financial_statement_line_id_query):
        qs = qs.filter(financial_statement_line_id=financial_statement_line_id_query)

    if is_valid_queryparam(period_length_months_query):
        qs = qs.filter(period_length_months=period_length_months_query)

    if is_valid_queryparam(reporting_standard_query):
        qs = qs.filter(reporting_standard=reporting_standard_query)

    if is_valid_queryparam(reporting_standard_query):
        qs = qs.filter(currency=reporting_standard_query)

    if is_valid_queryparam(financial_statement_type_query):
        qs = qs.filter(financial_statement_type=financial_statement_type_query)'''

    return qs


def filter_clubs(**kwargs):
    clubs = Club.objects.all()
    clubs = clubs.filter(**kwargs)
    return clubs


def filter_fsdata(**kwargs):
    qs = FinancialStatementFact.objects.all()
    qs = qs.filter(**kwargs)
    return qs


# Club Viewset
class ClubViewSet(viewsets.ModelViewSet):
    # queryset = Club.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ClubSerializer

    def get_queryset(self):
        clubs = Club.objects.all()
        params = self.request.query_params.dict()

        invalid_param_keys = []
        for key in params:
            print(key)
            print(params[key])
            if is_valid_queryparam(params[key]):
                print("key ja arvo:")
                print(key)
                print(params[key])
            else:
                print("ei valid")
                print(params[key])
                invalid_param_keys.append(key)

        print(invalid_param_keys)
        for item in invalid_param_keys:
            params.pop(item)
        print(params)
        clubs = filter_clubs(**params)

        return clubs

    # renderer_classes=[renderers.StaticHTMLRenderer]
    # @action(detail=False, methods=['get'])
    def retrieve(self, request, *args, **kwargs):
        print("search_val::")
        # search_val = request.GET('name', '')
        # print(search_val)
        print("get_routes_clubs!!")
        params = kwargs
        print("paramas:::")
        print(params)
        print("params_list:")
        params_list = params['pk'].split('&')
        print(params_list)

        clubs = Club.objects.all()
        serializer = ClubSerializer(clubs, many=True)

        return Response(serializer.data)


class FinancialStatementFactViewSet(viewsets.ModelViewSet):
    '''def get_queryset(self):
        qs = filter({})
        print("QQQQQQX:::")
        # print(qs)
        return qs'''

    def get_queryset(self):
        qs = FinancialStatementFact.objects.all()
        params = self.request.query_params.dict()
        print("params")
        print(params)

        invalid_param_keys = []
        for key in params:
            print(key)
            print(params[key])
            if is_valid_queryparam(params[key]):
                print("key ja arvo:")
                print(key)
                print(params[key])
            else:
                print("ei valid")
                print(params[key])
                invalid_param_keys.append(key)

        print(invalid_param_keys)
        for item in invalid_param_keys:
            params.pop(item)
        print(params)
        qs = filter_fsdata(**params)

        return qs

    queryset = FinancialStatementFact.objects.all()
    # print(queryset)
    # queryset = self.get_queryset()
    serializer_class = FinancialStatementFactSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
    def get_routes(request):
        print("get_routes!!")
        print(request.query_params)

    @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
    def highlight(self, request, *args, **kwargs):
        print("HIGHLIGHT:::")
        fact = self.get_object()
        return Response(fact.highlighted)
    '''
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)'''


class FinancialStatementLineViewSet(viewsets.ModelViewSet):
    '''def get_queryset(self):
        qs = filter({})
        return qs'''
    serializer_class = FinancialStatementLineSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    queryset = FinancialStatementLine.objects.all()


class FinancialStatementFact_Clubs_ViewSet(FinancialStatementFactViewSet):
    queryset = FinancialStatementFactViewSet.queryset.values(
        'club_id').distinct().order_by('club_id')
    print(queryset)
