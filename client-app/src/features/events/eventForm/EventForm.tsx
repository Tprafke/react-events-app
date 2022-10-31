import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Segment, Button, Header } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Event } from "../../../app/models/event";

export default observer(function EventForm() {
  const history = useHistory();
  const { eventStore } = useStore();
  const {
    createEvent,
    updateEvent,
    loading,
    loadEvent,
    loadingInitial,
  } = eventStore;
  const { id } = useParams<{ id: string }>();

  const [event, setEvent] = useState<Event>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The event title is required"),
    description: Yup.string().required("The event description is required"),
    category: Yup.string().required(),
    date: Yup.string().required("Date is required").nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id) loadEvent(id).then((event) => setEvent(event!));
  }, [id, loadEvent]);

  function handleFormSubmit(event: Event) {
    if (event.id.length === 0) {
      let newEvent = {
        ...event,
        id: uuid(),
      };
      createEvent(newEvent).then(() => history.push(`/events/${newEvent.id}`));
    } else {
      updateEvent(event).then(() => history.push(`/events/${event.id}`));
    }
  }

  if (loadingInitial) return <LoadingComponent content='Loading event...' />;

  return (
    <Segment clearing>
      <Header content='Event Details' sub color='teal' />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={event}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name='title' placeholder='Title' />
            <MyTextArea rows={3} placeholder='Description' name='description' />
            <MySelectInput
              options={categoryOptions}
              placeholder='Category'
              name='category'
            />
            <MyDateInput
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa'
              placeholderText='Date'
              name='date'
            />
            <Header content='Location Details' sub color='teal' />
            <MyTextInput placeholder='City' name='city' />
            <MyTextInput placeholder='Venue' name='venue' />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated='right'
              positive
              type='submit'
              content='Submit'
            />
            <Button
              as={Link}
              to='/events'
              floated='right'
              type='button'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
