const Dashboard = () => {
    return (
        <>
             <div className="container py-4">
        <h1 className="mb-4">Dashboard - Theme Test</h1>

        {/* Card */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Card Title</h5>
            <p className="card-text">
              This card's background, border, and text are themed using CSS variables.
            </p>
            <a href="#!" className="btn btn-primary me-2">Primary Action</a>
            <a href="#!" className="btn btn-secondary">Secondary Action</a>
          </div>
        </div>

        {/* Buttons */}
        <div className="mb-4">
          <button className="btn btn-primary me-2">Primary Button</button>
          <button className="btn btn-secondary me-2">Secondary Button</button>
          <button className="btn btn-outline-primary me-2">Outline Primary</button>
          <button className="btn btn-outline-secondary">Outline Secondary</button>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Heading 1</th>
                <th scope="col">Heading 2</th>
                <th scope="col">Heading 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
              </tr>
              <tr>
                <td>Data A</td>
                <td>Data B</td>
                <td>Data C</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Alerts */}
        <div className="mt-4">
          <div className="alert alert-primary" role="alert">
            This is a primary alert — check it out!
          </div>
          <div className="alert alert-secondary" role="alert">
            This is a secondary alert — check it out!
          </div>
        </div>
      </div>
        </>
    )
}
export default Dashboard;