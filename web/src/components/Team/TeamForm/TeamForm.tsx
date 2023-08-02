import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const TeamForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.team?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.team?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="color"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Color
        </Label>

        <TextField
          name="color"
          defaultValue={props.team?.color}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="color" className="rw-field-error" />

        <Label
          name="color2"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Color2
        </Label>

        <TextField
          name="color2"
          defaultValue={props.team?.color2}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="color2" className="rw-field-error" />

        <Label
          name="flagURL"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Flag url
        </Label>

        <TextField
          name="flagURL"
          defaultValue={props.team?.flagURL}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="flagURL" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TeamForm
