import Tetrahedron from "./tetrahedron.js";
import { kleetopify } from "./ShapeInterpolaters.js";

export const shapeObject = kleetopify(Tetrahedron, 9.0 / 5.0);

export function Info() {
  return (
    <>
      <h1> Triakis Tetrahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Triakis_tetrahedron"> Wikipedia page </a> </h2>
      <p> It's a triangular pyramid, with triangular pyramids glued to its faces!!! </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Catalan Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 12 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 18 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 8 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
