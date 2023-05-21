import Layout from '../../components/Layout'
import RaceResultsTable from 'components/Table';
import { useState, useEffect } from 'react';

const Home = () => {
	var [ResultsData, setResultsData] = useState<ResultsDataType[]>([{
		"id": 0,
		"Helm": "Alex",
		"Crew": "",
		"Class": {
			"Crew": 0,
			"Name": "",
			"PY": 1,
		},
		"BoatNumber": "",
		"CorrectedTime": 0,
		"Time": "",
		"Laps": 0,
		"Position": 1
	}])

	var [updateState, setUpdateState] = useState<number>(1)

	const addRaceEntry = async () => {
		var id = 1
		//this ids the entrant with the lowest number that is not being used.
		while (ResultsData.some(object => object.id === id)) {
			id++;
		}
		const entry: ResultsDataType = {
			id: id,
			Helm: "",
			Crew: "",
			Class: {
				Crew: 0,
				Name: "",
				PY: 1,
			},
			BoatNumber: "",
			CorrectedTime: 0,
			Time: "",
			Laps: 0,
			Position: 0
		}
		setResultsData(ResultsData.concat(entry))
		setUpdateState(updateState + 1)
	}

	const removeEntrant = async (entrantId: number) => {
		let tempResults: ResultsDataType[] = ResultsData
		let entrantIndex = ResultsData.findIndex(x => x.id === entrantId)

		tempResults.splice(entrantIndex, 1)

		setResultsData(tempResults)
		setUpdateState(updateState + 1)
	}

	const updateEntrant = async (entrant: ResultsDataType) => {
		let tempResults: ResultsDataType[] = ResultsData
		let entrantIndex = ResultsData.findIndex(x => x.id === entrant.id)

		tempResults[entrantIndex] = entrant

		setResultsData(tempResults)
		calculateResults()
	}

	const calculateResults = async () => {
		//most nuber of laps.
		let maxLaps = Math.max.apply(null, ResultsData.map(function (o: ResultsDataType) { return o.Laps }))
		if (!(maxLaps > 0)) {
			console.log("max laps not more than one")
			setUpdateState(updateState + 1)
			return
		}
		console.log(maxLaps)
		var TempData = ResultsData

		//calculate corrected time
		TempData.forEach(entrant => {
			if (entrant.Time == "" && entrant.Class.Name != "" && entrant.Laps == 0)
				return
			var timeParts: string[] = entrant.Time.split(':');
			if (timeParts[0] != undefined && timeParts[1] != undefined && timeParts[2] != undefined) {
				var seconds = (+timeParts[0]) * 60 * 60 + (+timeParts[1]) * 60 + (+timeParts[2]);
			}
			else {
				var seconds = 1
			}


			entrant.CorrectedTime = (seconds * 1000 * (entrant.Laps / maxLaps)) / entrant.Class.PY
		});

		//calculate finish position

		var sortedResults = TempData.sort((a, b) => a.CorrectedTime - b.CorrectedTime);

		sortedResults.forEach((result, index) => {
			result.Position = index + 1;
		});

		setResultsData(sortedResults)
		setUpdateState(updateState + 1)
	}

	// turn off for development
	// useEffect(() => {
	// 	//stop navigating away
	// 	window.onbeforeunload = function () {
	// 		return true;
	// 	};
	// }, [])


	return (
		<Layout>
			<p className="text-6xl font-extrabold text-gray-700 p-6">
				Sailing Tools
			</p>
			<div className='p-6 w-full'>
				<RaceResultsTable data={ResultsData} key={updateState} removeEntrant={removeEntrant} updateEntrant={updateEntrant} />
			</div>
			<div className="p-6 w-full">
				<p onClick={(e) => addRaceEntry()} className="cursor-pointer text-white bg-blue-600 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">
					Add Entry
				</p>
			</div>
		</Layout>
	);
};


export default Home;