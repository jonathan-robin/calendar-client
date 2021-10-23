function SwitchFilter(props: {current: string; setFilter: any; currentDate: string; setCurrentLayout: any; setSelectedDate: any, getTodos:any;}) {

  const handleClickDay = () => {
    props.setSelectedDate(new Date());
    props.setFilter({ day: true, month: false, week: false });
    props.setCurrentLayout("Day");
  };
  const handleClickWeek = () => {
    props.setFilter({ day: false, month: false, week: true });
    props.setCurrentLayout("Week");
  };
  const handleClickMonth = () => {
    props.setFilter({ day: false, month: true, week: false });
    props.setCurrentLayout("Month");
  };

  return (
    <div className="content-box">
      <div className="content-box__Switch">
        {props.current != "Day" && (
          <div className="input-form input-form__signIn">
            <div className="home-label home-label--day" onClick={handleClickDay}>
              {props.currentDate}
            </div>
          </div>
        )}
        {props.current != "Week" && (
          <div className="input-form input-form__signIn input-form__signIn--pseudo">
            <div className="input-form__signIn--label">
              <div className="home-label home-label--week" onClick={handleClickWeek}>
                Semaine
              </div>
            </div>
          </div>
        )}
        {props.current != "Month" && (
          <div className="input-form input-form__signIn input-form__signIn--pseudo">
            <div className="input-form__signIn--label">
              <div className="home-label home-label--month" onClick={handleClickMonth}>
                {props.currentDate.split(' ')[1]}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SwitchFilter;
