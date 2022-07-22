import {map} from 'lodash'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function List () {
  const {data} = useSWR(
      'https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=20&lang=Cn',
      fetcher,
      {suspense: true}
  );
  return <>{map(data, item => <div key={item.id}>{item.data[0].name}-{item.data[0].genre}</div>)}</>
}