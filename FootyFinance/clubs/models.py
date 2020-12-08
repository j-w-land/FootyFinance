from django.db import models


class Club(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    nickname = models.CharField(max_length=100)
    entry_created_at = models.DateTimeField()


class FinancialStatement(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)


class FinancialStatementLine(models.Model):
    class Meta:
        db_table = "fsdata_financial_statement_line"
    id = models.IntegerField(primary_key=True)
    tag = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=1000)
    parent = models.IntegerField()
    totalLine = models.BooleanField()
    # sequences = relationship('FinancialStatementLineSequence', backref='line')
    # facts = relationship('FinancialStatementFact', backref='line')


class FinancialStatementLineSequence(models.Model):
    id = models.IntegerField(primary_key=True)
    # sequence = Column('sequence', Integer, nullable=False)
    financial_statement_id = models.IntegerField()
    '''
    financial_statement_id = Column(Integer,
                                    ForeignKey('fsdata_financial_statement.id',
                                               onupdate='CASCADE',
                                               ondelete='CASCADE'),
                                    nullable=False)'''
    financial_statement_line_id = models.IntegerField()
    '''
    financial_statement_line_id = Column(Integer,
                                         ForeignKey('fsdata_financial_statement_line.id',
                                                    onupdate='CASCADE',
                                                    ondelete='CASCADE'),
                                         nullable=False)
                                         '''
    '''
    UniqueConstraint('fsdata_financial_statement_id',
                     'fsdata_financial_statement_line_id')
    financial_statement = relationship('FinancialStatement')
    financial_statement_line = relationship('FinancialStatementLine')'''


class FinancialStatementLineAlias(models.Model):
    id = models.IntegerField(primary_key=True)
    alias = models.CharField(max_length=200, unique=True)
    financial_statement_line_id = models.IntegerField()
    '''
    financial_statement_line_id = Column(Integer,
                                         ForeignKey('fsdata_financial_statement_line.id',
                                                    onupdate='CASCADE',
                                                    ondelete='CASCADE'),
                                         nullable=False)'''
    # financial_statement_line = relationship('FinancialStatementLine')


class FinancialStatementFact(models.Model):
    class Meta:
        db_table = "fsdata_financial_statement_fact"
    '''
    __table_args__ = tuple(
        [UniqueConstraint('club_id',
                          'financial_statement_line_id',
                          'fiscal_year',
                          'fiscal_period',
                          'financial_statement_type')])'''
    id = models.IntegerField(primary_key=True)
    fiscal_year = models.IntegerField()
    # FinancialStatementPeriod = models.TextChoices('fy', 'q1', 'q2', 'q3', 'q4')
    # FinancialStatementPeriod = models.CharField(max_length=10)
    fiscal_period = models.CharField(max_length=10)
    start_date = models.DateField()
    end_date = models.DateField()
    amount = models.FloatField()
    club_id = models.IntegerField()
    financial_statement_line_id = models.IntegerField()
    '''
    club_id = Column(Integer,
                     ForeignKey('clubs_club.id',
                                onupdate='CASCADE',
                                ondelete='CASCADE'),
                     nullable=False)
    financial_statement_line_id = Column(
        Integer,
        ForeignKey('fsdata_financial_statement_line.id',
                   onupdate='CASCADE',
                   ondelete='CASCADE'),
        nullable=False)'''
    period_length_months = models.IntegerField()
    reporting_standard = models.CharField(max_length=20)
    currency = models.CharField(max_length=5)
    financial_statement_type = models.IntegerField()
    '''
    financial_statement_type = Column(
        Integer,
        ForeignKey('fsdata_financial_statement.id',
                   onupdate='CASCADE',
                   ondelete='CASCADE'))'''

    # club = relationship('Club')

    '''
    class FinancialStatementFactFSLIs(FinancialStatementFact):
        financial_statement_line_id = models.IntegerField()
    '''
