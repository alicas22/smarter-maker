from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired,ValidationError

def validate_question(form,field):
    question = field.data
    if len(question) < 2 or len(question) >255:
        raise ValidationError("Question must be between 1 and 255 characters")

def validate_answer(form,field):
    answer = field.data
    if len(answer) < 2 or len(answer) >500:
        raise ValidationError("Answer must be between 1 and 500 characters")

class CardForm(FlaskForm):
  question = StringField('question', validators=[DataRequired(), validate_question])
  answer = StringField('answer', validators=[DataRequired(),validate_answer])
  mastery = IntegerField('mastery')
  deck_id = IntegerField('deck_id', validators=[DataRequired()])
