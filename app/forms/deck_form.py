from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

def validate_name(form, field):
    name =field.data
    if len(name) < 3 or len(name) >255:
         raise ValidationError('Name must be between 3 and 255 characters')

class DeckForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(), validate_name])
  classId = IntegerField('classId', validators=[DataRequired()])
