import Icosahedron from "./icosahedron.js";
import { Kleetopify } from "./ShapeInterpolaters.js";

const phi = (1 + Math.sqrt(5)) / 2;
const l0 = (3 * Math.sqrt(3) + Math.sqrt(15)) / 6;
const l1 = Math.sqrt((75 + 6 * Math.sqrt(5)) * (phi * phi + 1)) / 11;
export const shapeObject = Kleetopify(Icosahedron, l1 / l0);

export function Info() {
  return (
    <>
      <h1> Triakis Icosahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Triakis_icosahedron"> Wikipedia page </a> </h2>
      <p> i HATE scalene triangles!!! </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Catalan Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 60 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 90 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 32 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
