import Octahedron from "./octahedron.js"
import { Kleetopify } from "./ShapeInterpolaters.js";

export const shapeObject = Kleetopify(Octahedron, (Math.sqrt(2) - 1) * 3);

export function Info() {
  return (
    <>
      <h1> Triakis Octahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Triakis_octahedron"> Wikipedia page </a> </h2>
      <p> Apparently also named a trigonal trisoctahedron. </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Catalan Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 24 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 36 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 14 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
