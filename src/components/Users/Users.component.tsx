import { useEffect } from "react";
import useStore from "../../store.js"

const Users = () => {
  const { data, fetchData } = useStore();
    useEffect(() => {
        fetchData()
    }, [fetchData])
  return (
    <div>
       {/* {data.map((item, i) => (
        <div key={i}>{item.name}</div>
      ))} */}
      {JSON.stringify(data)}
    </div>
  )
}

export default Users