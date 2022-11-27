import React from 'react'

export const Visualizar = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center mh-100 w-100'>
            <h3> Reservaciones </h3>
            <div className='d-flex justify-content-end align-items-center mt-3 mb-2' style={{ width: "90%" }}>
                <button className="btn btn-success btn-lg btn-block"> + Crear reservación</button>
            </div>

            <div style={{ width: "90%" }}>
                <table class="table table-success table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
