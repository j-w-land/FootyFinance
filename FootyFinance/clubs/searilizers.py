from rest_framework import serializers
from clubs.models import Club, FinancialStatement, FinancialStatementLine, FinancialStatementLineSequence, FinancialStatementLineAlias, FinancialStatementFact


# Club Serializer

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'


class FinancialStatementSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialStatement
        fields = '__all__'


class FinancialStatementLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialStatementLine
        fields = '__all__'


class FinancialStatementLineSequenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialStatementLineSequence
        fields = '__all__'


class FinancialStatementLineAliasSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialStatementLineAlias
        fields = '__all__'


class FinancialStatementFactSerializer(serializers.HyperlinkedModelSerializer):
    # highlight = serializers.HyperlinkedIdentityField(view_name='fsdata', format='html')

    class Meta:
        model = FinancialStatementFact
        fields = ['id', 'fiscal_year', 'fiscal_period', 'start_date', 'end_date', 'amount', 'club_id', 'financial_statement_line_id', 'period_length_months', 'reporting_standard', 'currency', 'financial_statement_type']
