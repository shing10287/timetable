import { useState } from "react";

const Course = ({id, selectedCourses, setSelectedCourses, sem}) => {
    const [hovering, setHovering] = useState(false);
    const addCourse = (selectedCourses) => {
        if (typeof selectedCourses[sem].find(c => c === id) !== 'undefined') return selectedCourses;
        let res = selectedCourses.slice();
        res[sem].push(id);
        return res;
    }
    const isSelected = () => {
        return typeof selectedCourses[sem].find(course => id === course) !== 'undefined';
    }
    const [boxCheck, setBoxCheck] = useState(isSelected());
    const removeCourse = (selectedCourses) => {
        let res = selectedCourses.slice();
        res[sem] = res[sem].filter(c => c !== id);
        return res;
    }
    const handleMouseEnter = event => {
        if (!isSelected()) {
            setSelectedCourses(addCourse);
            setHovering(true);
        }
    }
    const handleMouseLeave = event => {
        if (hovering) {
            setSelectedCourses(removeCourse);
            setHovering(false);
        }
    }
    const tickCourse = event => {
        if (!boxCheck) {
            setBoxCheck(true);
            setHovering(false);
        }
        else {
            setSelectedCourses(removeCourse);
            setBoxCheck(false);
        }
    }

    return (
        <div className="Course" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <label className="CourseName">
                {id}
                {<input
                    type="checkbox"
                    className="CourseCheckbox"
                    id={id}
                    onChange={tickCourse}
                    checked={boxCheck}
                />}
            </label>
        </div>
    );
}

export default Course