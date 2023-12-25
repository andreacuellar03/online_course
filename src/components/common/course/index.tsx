import { useEffect } from 'react';
import { useAppSelector } from 'store';
import {
  useLazyGetAdminCoursesQuery,
  useLazyGetUserCoursesQuery,
} from 'store/reducer/api';
import Spinner from '../../Spinner';
import CourseDetails from 'components/common/course/CourseDetails';
import CourseItem from 'components/common/course/CourseItem';
import CoursesContentWrapper from '../CoursesContentWrapper';
import EmptyItems from '../EmptyItems';

const Courses = () => {
  const {
    course: { courses: userCourses, showCourseDetail, adminCourses },
    user: { isAdmin },
  } = useAppSelector((state) => state);
  const [
    getAdminCourses,
    {
      isFetching: isAdminCoursesFetching,
      isLoading: isAdminCoursesLoading,
    },
  ] = useLazyGetAdminCoursesQuery();
  const [
    getUserCourses,
    { isFetching: isUserCoursesFetching, isLoading: isUserCoursesLoading },
  ] = useLazyGetUserCoursesQuery();
  const isFetchingOrLoading =
    isUserCoursesFetching ||
    isUserCoursesLoading ||
    isAdminCoursesFetching ||
    isAdminCoursesLoading;
  const courses = isAdmin ? adminCourses.data : userCourses;

  useEffect(() => {
    isAdmin ? getAdminCourses() : getUserCourses();
  }, []);

  return (
    <>
      {isFetchingOrLoading ? (
        <Spinner
          styles={
            isAdmin
              ? 'w-8 h-8 rounded-full border-t-2 border-black animate-spin'
              : undefined
          }
        />
      ) : courses.length ? (
        <CoursesContentWrapper>
          {courses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </CoursesContentWrapper>
      ) : (
        <EmptyItems />
      )}
      {showCourseDetail && <CourseDetails />}
    </>
  );
};

export default Courses;
