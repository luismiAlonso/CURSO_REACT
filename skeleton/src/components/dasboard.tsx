import { Link } from "react-router-dom"
import { Facturas } from "../pages/facturas"
import { Otro } from "../pages/otro"


export function Dasboard(){

    return (
        <div className="dasboard">
          <ul>
            <li>
              <Link to="/Facturas" >Facturas</Link>
            </li>
            <li>
              <Link to="/" >Otro</Link>
            </li>
          </ul>
        </div>
    )
} 