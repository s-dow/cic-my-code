const freeItems = [
  "10 users included",
  "2 GB of storage",
  "Email support",
  "Help center access",
]
const Card = (props) => {
  return (
    <div className="card mb-4 rounded-3 shadow-sm">
      <div className="card-header py-3">
        <h4 className="my-0 fw-normal">{props.header}</h4>
      </div>
      <div className="card-body">
        <h1 className="card-title pricing-card-title">
          {props.price}
          <small className="text-muted fw-light">{props.period}</small>
        </h1>
        <ul className="list-unstyled mt-3 mb-4">
          {props.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button type="button" className="w-100 btn btn-lg btn-outline-primary">
          {props.buttonText}
        </button>
      </div>
    </div>
  )
}
export const ExampleToConvertToReact = (props) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
      <div className="col">
        <Card
          header="Free"
          price="$0"
          period="/mo"
          items={freeItems}
          buttonText="Sign up for free"
        />
      </div>
      <div className="col">
        <Card header="Free" price="$15" period="/mo" />
      </div>
      <div className="col">
        <Card header="Free" price="$129" period="/yr" />
      </div>
    </div>
  )
}







Message student-pasted-code-c2















