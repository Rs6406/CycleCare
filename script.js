document
.getElementById("calculateBtn")
.addEventListener("click", calculateCycle);

function calculateCycle(){

    const lastPeriodValue =
    document.getElementById("lastPeriod").value;

    const cycleLength =
    Number(document.getElementById("cycleLength").value);

    if(lastPeriodValue === ""){
        alert("Please select a date.");
        return;
    }

    const lastPeriod =
    new Date(lastPeriodValue);

    const nextPeriod =
    new Date(lastPeriod);

    nextPeriod.setDate(
        nextPeriod.getDate() + cycleLength
    );

    const ovulation =
    new Date(nextPeriod);

    ovulation.setDate(
        ovulation.getDate() - 14
    );

    const fertileStart =
    new Date(ovulation);

    fertileStart.setDate(
        fertileStart.getDate() - 5
    );

    const fertileEnd =
    new Date(ovulation);

    fertileEnd.setDate(
        fertileEnd.getDate() + 1
    );

    const today = new Date();

    const difference =
    Math.ceil(
        (nextPeriod - today) /
        (1000 * 60 * 60 * 24)
    );

    const result =
    document.getElementById("result");

    result.innerHTML = `
        <div class="loading">
            🌸 Analyzing Your Cycle...
        </div>
    `;

    setTimeout(() => {

        result.innerHTML = `

        <div class="result-card" id="card1">
            <h3>📅 Next Period</h3>
            <p>${nextPeriod.toDateString()}</p>
        </div>

        <div class="result-card" id="card2">
            <h3>🥚 Ovulation Date</h3>
            <p>${ovulation.toDateString()}</p>
        </div>

        <div class="result-card" id="card3">
            <h3>🌱 Fertile Window</h3>
            <p>
            ${fertileStart.toDateString()}
            <br>
            to
            <br>
            ${fertileEnd.toDateString()}
            </p>
        </div>

        <div class="result-card" id="card4">
            <h3>⏳ Days Remaining</h3>
            <p>${difference} Days</p>
        </div>

        <div class="result-card" id="card5">
            <h3>⚠️ Important Note</h3>
            <p>
            Predictions are estimates only.
            Results may be less accurate for
            irregular cycles, PCOS, PCOD,
            hormonal conditions, pregnancy,
            or recent cycle changes.
            </p>
        </div>

        `;

        setTimeout(()=>{
            document.getElementById("card1")
            .classList.add("show");
        },400);

        setTimeout(()=>{
            document.getElementById("card2")
            .classList.add("show");
        },1200);

        setTimeout(()=>{
            document.getElementById("card3")
            .classList.add("show");
        },2000);

        setTimeout(()=>{
            document.getElementById("card4")
            .classList.add("show");
        },2800);

        setTimeout(()=>{
            document.getElementById("card5")
            .classList.add("show");
        },3500);

        generateCalendar(
            nextPeriod,
            ovulation,
            fertileStart,
            fertileEnd
        );

    },1500);
}

function generateCalendar(
    nextPeriod,
    ovulation,
    fertileStart,
    fertileEnd
){

    const container =
    document.getElementById("calendarContainer");

    const year =
    nextPeriod.getFullYear();

    const month =
    nextPeriod.getMonth();

    const firstDay =
    new Date(year, month, 1).getDay();

    const totalDays =
    new Date(year, month + 1, 0).getDate();

    let html = `
    <div class="calendar">

    <div class="calendar-title">
        📅 ${nextPeriod.toLocaleString(
            "default",
            { month:"long" }
        )} ${year}
    </div>

    <div class="calendar-grid">

    <div class="day-name">S</div>
    <div class="day-name">M</div>
    <div class="day-name">T</div>
    <div class="day-name">W</div>
    <div class="day-name">T</div>
    <div class="day-name">F</div>
    <div class="day-name">S</div>
    `;

    for(let i=0;i<firstDay;i++){
        html += "<div></div>";
    }

    for(let day=1; day<=totalDays; day++){

        const current =
        new Date(year, month, day);

        let className = "day";

        if(
            current.toDateString() ===
            nextPeriod.toDateString()
        ){
            className += " period";
        }

        if(
            current >= fertileStart &&
            current <= fertileEnd
        ){
            className += " fertile";
        }

        if(
            current.toDateString() ===
            ovulation.toDateString()
        ){
            className += " ovulation";
        }

        html += `
        <div class="${className}">
            ${day}
        </div>
        `;
    }

    html += `
    </div>

    <div style="
    margin-top:15px;
    display:flex;
    justify-content:space-around;
    font-size:14px;
    ">
        <span>🩸 Period</span>
        <span>🥚 Ovulation</span>
        <span>🌱 Fertile</span>
    </div>

    </div>
    `;

    container.innerHTML = html;
}