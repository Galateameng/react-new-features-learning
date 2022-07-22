export default function Demo () {
  // Before: Render twice, once for each state update
  // setTimeout(() => {
  //   setCount1(c1 => c1 + 1);
  //   setCount2(c2 => c2 + 1);
  // }, 1000);

  // // After: only re-render once at the end
  // setTimeout(() => {
  //   setCount1(c1 => c1 + 1);
  //   setCount2(c2 => c2 + 1);
  // }, 1000);

  return (
    <div>
      <h3>Automatic Batching</h3>

      
    </div>
  )
}