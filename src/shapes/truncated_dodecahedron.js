import Dodecahedron from "./dodecahedron.js";
import { Truncate } from "./ShapeInterpolaters.js";

export const shapeObject = Truncate(Dodecahedron);

export function Info() {
  return (
    <>
      <h1> Truncated Dodecahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Truncated_dodecahedron"> Wikipedia page </a> </h2>
      <p> Honestly anything larger than a hexagon is gross in my opinion. </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Archimedean Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 32 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 90 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 60 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
