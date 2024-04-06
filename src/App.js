import React, { useState } from 'react';
import './App.css';

function App() {
  const initialStudents = [
    { id: 1, name: 'Lakshmi', ticketNumber: 'T001', ticketTopic: 'React Basics', examGrade: 4.5, ratingGrade: 3.5, comments: 'Good effort' },
    { id: 2, name: 'Rahul', ticketNumber: 'T002', ticketTopic: 'React Hooks', examGrade: 3.8, ratingGrade: 4.2, comments: 'Excellent work' },
    { id: 3, name: 'Narayana', ticketNumber: 'T003', ticketTopic: 'React Advanced', examGrade: 4.0, ratingGrade: 3.9, comments: 'Great job' },
    { id: 4, name: 'Veer', ticketNumber: 'T004', ticketTopic: 'React State Management', examGrade: 4.2, ratingGrade: 4.1, comments: 'Well done' },
    { id: 5, name: 'Bhagavan', ticketNumber: 'T005', ticketTopic: 'React Context API', examGrade: 3.2, ratingGrade: 3.0, comments: 'Keep it up' },
    { id: 6, name: 'Aishu', ticketNumber: 'T006', ticketTopic: 'React Component Lifecycle', examGrade: 4.4, ratingGrade: 4.0, comments: 'Impressive' }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [showStatistics, setShowStatistics] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterType, setFilterType] = useState('all');

  const calculateFinalGrade = (examGrade, ratingGrade) => {
    return 0.6 * examGrade + 0.4 * ratingGrade;
  };

  const toggleStatistics = () => {
    setShowStatistics(!showStatistics);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filterStudents = () => {
    if (filterType === 'all') {
      return students;
    } else if (filterType === 'passed') {
      return students.filter(student => calculateFinalGrade(student.examGrade, student.ratingGrade) >= 4);
    } else if (filterType === 'failed') {
      return students.filter(student => calculateFinalGrade(student.examGrade, student.ratingGrade) < 4);
    }
  };

  const sortedStudents = filterStudents().sort((a, b) => {
    const finalGradeA = calculateFinalGrade(a.examGrade, a.ratingGrade);
    const finalGradeB = calculateFinalGrade(b.examGrade, b.ratingGrade);
    return sortOrder === 'asc' ? finalGradeA - finalGradeB : finalGradeB - finalGradeA;
  });

  const filteredStudents = sortedStudents.filter(student =>
    student.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const totalStudents = students.length;
  const passedStudents = students.filter(student => calculateFinalGrade(student.examGrade, student.ratingGrade) >= 4).length;
  const averageGrade = students.reduce((total, student) => total + calculateFinalGrade(student.examGrade, student.ratingGrade), 0) / totalStudents;
  const maxGrade = Math.max(...students.map(student => calculateFinalGrade(student.examGrade, student.ratingGrade)));
  const minGrade = Math.min(...students.map(student => calculateFinalGrade(student.examGrade, student.ratingGrade)));

  return (
    <div className="App">
      <header className="Header">
        <center><h1>Gradebook Project 2100032424</h1>
        <br></br></center> 
      </header>
      <main className="Main">
        <div className="Options">
          <button onClick={toggleStatistics}>
            {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
          </button>
          <input
            type="text"
            placeholder="Filter by name"
            value={filterValue}
            onChange={handleFilterChange}
          />
          <select className="FilterDropdown" value={filterType} onChange={handleFilterTypeChange}>
            <option value="all">All</option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
          </select>
          <button onClick={toggleSortOrder}>
            {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Ticket's Number</th>
              <th>Rating Grade</th>
              <th>Exam Grade</th>
              <th>Final Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.ticketNumber}</td>
                <td>{student.ratingGrade}</td>
                <td>{student.examGrade}</td>
                <td>{calculateFinalGrade(student.examGrade, student.ratingGrade)}</td>
                <td>{calculateFinalGrade(student.examGrade, student.ratingGrade) >= 4 ? 'Passed' : 'Failed'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {showStatistics && (
          <div className="Statistics">
            <h2>Statistics</h2>
            <p>Total Students: {totalStudents}</p>
            <p>Passed Students: {passedStudents}</p>
            <p>Average Grade: {averageGrade.toFixed(2)}</p>
            <p>Max Grade: {maxGrade}</p>
            <p>Min Grade: {minGrade}</p>
          </div>
        )}
        <footer className="Footer">
          <button onClick={toggleStatistics}>
            {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
          </button>

          <p>&copy; Narayana 2100032424</p>
        </footer>
      </main>
    </div>
  );  
}

export default App;
