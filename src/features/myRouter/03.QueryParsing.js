import * as React from "react";
import * as JSURL from "jsurl";
import { Routes, Route, Link, useSearchParams, BrowserRouter } from "react-router-dom";

export default function QueryParsing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

/** 封装一个 useQueryParam 的hooks，用来设置query string 的值 */
function useQueryParam(key){
  let [searchParams, setSearchParams] = useSearchParams();
  let paramValue = searchParams.get(key);

  let value = React.useMemo(() => JSURL.parse(paramValue), [paramValue]);

  let setValue = React.useCallback(
    (newValue, options) => {
      let newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, JSURL.stringify(newValue));
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams]
  );

  return [value, setValue];
}


function Home() {
  let [jianbing, setJianbing] = useQueryParam("jianbing");

  if (!jianbing) {
    jianbing = { peicai: [], spicy: "regular", extra: [] };
  }

  function handleChange(event) {
    let form = event.currentTarget;
    let formData = new FormData(form);

    let jianbing = {
      peicai: formData.getAll("peicai") ,
      spicy: formData.get("spicy") ,
      extra: formData.getAll("extra"),
    };

    setJianbing(jianbing, { replace: true });
  }

  return (
    <div style={{padding: 20}}>
      <form onChange={handleChange}>
        <p>加点小料?</p>

        <p>
          <label>
            <input
              defaultChecked={jianbing.peicai.includes("egg")}
              type="checkbox"
              name="peicai"
              value="egg"
            />
            鸡蛋
          </label>
          <br />
          <label>
            <input
              defaultChecked={jianbing.peicai.includes("meat")}
              type="checkbox"
              name="peicai"
              value="meat"
            />
           肉
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="peicai"
              value="latiao"
              defaultChecked={jianbing.peicai.includes("latiao")}
            />
            辣条
          </label>
        </p>

        <p>要不要辣?</p>
        <p>
          <label>
            <input
              type="radio"
              name="spicy"
              value="little"
              defaultChecked={jianbing.spicy === "little"}
            />
            微辣
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="spicy"
              value="regular"
              defaultChecked={jianbing.spicy === "regular"}
            />
            正常辣
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="spicy"
              value="super"
              defaultChecked={jianbing.spicy === "super"}
            />
            变态辣
          </label>
        </p>

        <p>其他需求呀？</p>
        <p>
          <label>
            <input
              type="checkbox"
              name="extra"
              value="conghua"
              defaultChecked={jianbing.extra.includes('conghua')}
            />
            葱花
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="extra"
              value="xiangcai"
              defaultChecked={jianbing.extra.includes('xiangcai')}
            />
            香菜
          </label>
          <br />
        </p>
      </form>

      <p>顾客的需求是:</p>

      <pre>{JSON.stringify(jianbing || {}, null, 2)}</pre>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nolittleg to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
