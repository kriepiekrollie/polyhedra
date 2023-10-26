import Icosahedron from "./icosahedron.js";
import { Truncate } from "./ShapeInterpolaters.js";

export const shapeObject = Truncate(Icosahedron);

export function Info() {
  return (
    <>
      <h1> Truncated Icosahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Truncated_icosahedron"> Wikipedia page </a> </h2>
      <p> Most people probably know this one for being the shape of a soccerball </p>
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
