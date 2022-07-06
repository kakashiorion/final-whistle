import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const TournamentForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.tournament?.id)
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
          defaultValue={props.tournament?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="venue"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Venue
        </Label>

        <TextField
          name="venue"
          defaultValue={props.tournament?.venue}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="venue" className="rw-field-error" />

        <Label
          name="logoURL"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Logo url
        </Label>

        <TextField
          name="logoURL"
          defaultValue={props.tournament?.logoURL}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="logoURL" className="rw-field-error" />

        <Label
          name="startDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start date
        </Label>

        <DatetimeLocalField
          name="startDate"
          defaultValue={formatDatetime(props.tournament?.startDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="startDate" className="rw-field-error" />

        <Label
          name="endDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End date
        </Label>

        <DatetimeLocalField
          name="endDate"
          defaultValue={formatDatetime(props.tournament?.endDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="endDate" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TournamentForm
