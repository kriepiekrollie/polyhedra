import Dodecahedron from "./dodecahedron.js";
import { kleetopify } from "./ShapeInterpolaters.js";

const phi = (1 + Math.sqrt(5)) / 2;
const l0 = Math.sqrt(10 * Math.sqrt(5) + 25) / 5.0;
const l1 = Math.sqrt(1 + phi * phi) * ((3 * phi + 12) / 19);
export const shapeObject = kleetopify(Dodecahedron, l1 / l0);

export function Info() {
  return (
    <>
      <h1> Pentakis Dodecahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Pentakis_dodecahedron"> Wikipedia page </a> </h2>
      <p> This might be my favorite Catalan solid. I lovvvee all the isoceles triangles coming together in different ways </p>
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
