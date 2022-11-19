import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import EventFilters from "./EventFilters";
import EventList from "./EventList";

export default observer(function EventDashboard() {
  const { eventStore } = useStore();
  const { loadEvents, eventRegistry, setPagingParams, pagination } = eventStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadEvents().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (eventRegistry.size <= 1) loadEvents();
  }, [eventRegistry.size, loadEvents]);

  if (eventStore.loadingInitial && !loadingNext)
    return <LoadingComponent content='Loading events' />;

  return (
    <Grid>
      <Grid.Column width='10'>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={
            !loadingNext &&
            !!pagination &&
            pagination.currentPage < pagination.totalPages
          }
          initialLoad={false}
        >
          <EventList />
        </InfiniteScroll>
      </Grid.Column>
      <Grid.Column width='6'>
        <EventFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
});
