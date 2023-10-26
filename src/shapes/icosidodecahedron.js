import Icosahedron from "./icosahedron.js";
import { Truncate, Rectify } from "./ShapeInterpolaters.js";

export const shapeObject = Rectify(Icosahedron);

export function Info() {
  return (
    <>
      <h1> Icosidodecahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Icosidodecahedron"> Wikipedia page </a> </h2>
      <p> I always love spotting soccer balls made from this shape. </p>
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
            <td> 60 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 30 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
