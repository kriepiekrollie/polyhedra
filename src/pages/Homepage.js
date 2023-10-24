import { React, useState, useRef, useEffect } from "react";
import ShapeRenderer from "../shapes/ShapeRenderer.js";
import * as PlatonicSolids from "../shapes/PlatonicSolids.js";
import * as CatalanSolids from "../shapes/CatalanSolids.js";
import * as ArchimedeanSolids from "../shapes/ArchimedeanSolids.js"
import * as KeplerPoinsotSolids from "../shapes/KeplerPoinsotSolids.js"
import "./styles.css";

export default function Homepage() {
  return (
    <>
      <section>
        <div className="sectionContent">
          <ShapeRenderer shape={PlatonicSolids.TETRAHEDRON} wireframeMode={false} />
          <div className="sectionText">
            <h1> Tetrahedron </h1>
            <h2> <a href="https://en.wikipedia.org/wiki/Tetrahedron"> Wikipedia page </a> </h2>
            <p> Pretty much a triangular pyramid made from equilateral triangles. </p>
            <table>
              <tbody>
                <tr>
                  <th> Type </th>
                  <td> Platonic Solid </td>
                </tr>
                <tr>
                  <th> Faces </th>
                  <td> 4 </td>
                </tr>
                <tr>
                  <th> Edges </th>
                  <td> 6 </td>
                </tr>
                <tr>
                  <th> Vertices </th>
                  <td> 4 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="sectionContent">
          <ShapeRenderer shape={PlatonicSolids.CUBE} wireframeMode={false} />
          <div className="sectionText">
            <h1> Hexahedron </h1>
            <h2> <a href="https://en.wikipedia.org/wiki/Cube"> Wikipedia page </a> </h2>
            <p> Sometimes people refer to this one as "a cube". </p>
            <table>
              <tbody>
                <tr>
                  <th> Type </th>
                  <td> Platonic Solid </td>
                </tr>
                <tr>
                  <th> Faces </th>
                  <td> 6 </td>
                </tr>
                <tr>
                  <th> Edges </th>
                  <td> 12 </td>
                </tr>
                <tr>
                  <th> Vertices </th>
                  <td> 8 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="sectionContent">
          <ShapeRenderer shape={PlatonicSolids.OCTAHEDRON} wireframeMode={false} />
          <div className="sectionText">
            <h1> Octahedron </h1>
            <h2> <a href="https://en.wikipedia.org/wiki/Octahedron"> Wikipedia page </a> </h2>
            <p> If you squint you'll see it's also a triangular antiprism. </p>
            <table>
              <tbody>
                <tr>
                  <th> Type </th>
                  <td> Platonic Solid </td>
                </tr>
                <tr>
                  <th> Faces </th>
                  <td> 8 </td>
                </tr>
                <tr>
                  <th> Edges </th>
                  <td> 12 </td>
                </tr>
                <tr>
                  <th> Vertices </th>
                  <td> 6 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="sectionContent">
          <ShapeRenderer shape={PlatonicSolids.DODECAHEDRON} wireframeMode={false} />
          <div className="sectionText">
            <h1> Dodecahedron </h1>
            <h2> <a href="https://en.wikipedia.org/wiki/Dodecahedron"> Wikipedia page </a> </h2>
            <p> Who would have thought that pentagons could be so sexy? </p>
            <table>
              <tbody>
                <tr>
                  <th> Type </th>
                  <td> Platonic Solid </td>
                </tr>
                <tr>
                  <th> Faces </th>
                  <td> 12 </td>
                </tr>
                <tr>
                  <th> Edges </th>
                  <td> 30 </td>
                </tr>
                <tr>
                  <th> Vertices </th>
                  <td> 20 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="sectionContent">
          <ShapeRenderer shape={PlatonicSolids.ICOSAHEDRON} wireframeMode={false} />
          <div className="sectionText">
            <h1> Icosahedron </h1>
            <h2> <a href="https://en.wikipedia.org/wiki/Icosahedron"> Wikipedia page </a> </h2>
            <p> Honestly probably my favorite platonic solid. Just look at all those triangles!!! </p>
            <table>
              <tbody>
                <tr>
                  <th> Type </th>
                  <td> Platonic Solid </td>
                </tr>
                <tr>
                  <th> Faces </th>
                  <td> 20 </td>
                </tr>
                <tr>
                  <th> Edges </th>
                  <td> 30 </td>
                </tr>
                <tr>
                  <th> Vertices </th>
                  <td> 12 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
