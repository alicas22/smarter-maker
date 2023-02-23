from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

def validate_name(form, field):
    name = field.data
    if len(name) < 5:
        raise ValidationError('Name must be at least 5 characters long')
    elif len(name) > 50:
        raise ValidationError('Name must be less than 50 characters long')

def validate_headline(form, field):
    headline = field.data
    if len(headline) < 10 or len(headline) > 255:
        raise ValidationError('Description must be between 10 and 255 characters long')

def validate_description(form, field):
    description = field.data
    if  len(description) <10 or len(description) > 2000:
        raise ValidationError('Description must be between 10 and 2000 characters long')

class ClassForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), validate_name])
    headline = StringField('headline', validators=[DataRequired(), validate_headline])
    description = StringField('description', validators=[DataRequired(), validate_description])
