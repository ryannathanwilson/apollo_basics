import { React, useState } from "react";
import { render } from "react-dom";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql,
} from "@apollo/client";
import { props } from "bluebird";

const client = new ApolloClient({
	uri: "https://71z1g.sse.codesandbox.io/",
	cache: new InMemoryCache(),
});


// const EXCHANGE_RATES = gql`
// 	query GetExchangeRates {
// 		rates(currency: "USD") {
// 			currency
// 			rate
// 		}
// 	}
// `;

// function ExchangeRates() {
// 	const { loading, error, data } = useQuery(EXCHANGE_RATES);

// 	if (loading) return <p>Loading...</p>;
// 	if (error) return <p>Error :(</p>;

// 	return data.rates.map(({ currency, rate }) => (
// 		<div key={currency}>
// 			<p>
// 				{currency}: {rate}
// 			</p>
// 		</div>
// 	))
// }

const GET_DOGS = gql`
	query GetDogs {
		dogs {
			id
			breed
		}
	}
`;

function Dogs({ onDogSelected }) {
	const { loading, error, data } = useQuery(GET_DOGS);

	if (loading) return 'loading...';
	if (error) return `Error! ${error.message}`;

	return (
		<select name="dog" onChange={onDogSelected}>
			{data.dogs.map(dog => (
				<option key={dog.id} value={dog.breed}>
					{dog.breed}
				</option>
			))}
		</select>
	)
}

const GET_DOG_PHOTO = gql`
	query Dog($breed: String!) {
		dog(breed: $breed) {
			id
			displayImage
		}
	}
`;

function DogPhoto({ breed }) {
	const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
		variables: { breed },
	});

	if (loading) return null;
	if (error) return `Error! ${error}`;

	return (
		<img src={data.dog.displayImage} style={{ height: 100, width: 100 }} alt={breed} />
	);
}

function App() {
	const [selectedDog, setSelectedDog] = useState();

	return (
		<div>
			<h2>My first Apollo app 🚀</h2>
			{/* <ExchangeRates /> */}
			<Dogs>

			</Dogs>
				<DogPhoto breed={selectedDog} />
		</div>
	);
}

render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root'),
)