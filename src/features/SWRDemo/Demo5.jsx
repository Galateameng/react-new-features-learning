import useSWR from "swr";

const getGPSCoordinates = async () => {
  return new Promise((resolve, reject) => {
    console.log('promise')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position, 'demo5 resolve')
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log('demo5===error')
        reject(error);
      }
    );
  });
};

const GPS = () => {
  const { data, loading, mutate } = useSWR("gps", getGPSCoordinates,{ 
    dedupingInterval: 0, // 删除一段时间内相同 key 的重复请求（以毫秒为单位）
  });
  return (
    <div>
      <button onClick={() => mutate()}>click me</button>
      <div>Location: {JSON.stringify(data)}</div>
    </div>
  );
};

export default GPS;
