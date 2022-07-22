import { Suspense, useEffect, useState, lazy } from "react"
import {map} from 'lodash'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json());

// before
function List0 () {
  const {data, isValidating: loading} = useSWR(
      'https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=20&lang=Cn',
      fetcher,
  );

  if (loading) return <div>loading.....</div>

  return <>{map(data, item => <div key={item.id}>{item.data[0].name}-{item.data[0].genre}</div>)}</>
}

// after
function List () {
  const {data} = useSWR(
      'https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=20&lang=Cn',
      fetcher,
      {suspense: true}
  );
  return <>{map(data, item => <div key={item.id}>{item.data[0].name}-{item.data[0].genre}</div>)}</>
}

export default function Demo () {
  // return <List0 />

  return (
    <Suspense fallback={<div>loading by suspense</div>}>
      <List />
    </Suspense>
  )
}
