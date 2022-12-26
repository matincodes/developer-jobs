let button = document.querySelector(".button-container")

function getJobs(){
    fetch("data.json")
    .then(response => response.json())
    .then(data => {
        showJobs(data)
        button.addEventListener("click",  ()=>{
            let text = document.querySelector("#filter-jobs").value
            let filteredJobs = filterJobs(data, text)
            showJobs(filteredJobs)
        })
        
    })
}

function filterJobs(jobs, searchText){
    if(searchText){
        let filteredItems = jobs.filter(job =>{
            if(job.roleName.toLowerCase().includes(searchText) ||
                job.type.toLowerCase().includes(searchText) ||
                job.company.toLowerCase().includes(searchText) ||
                job.requirements.content.toLowerCase().includes(searchText)){
                    return true
                }else{
                    return false
                }
        })
        return filteredItems
    } else{
        return jobs

    }
    
}

function showJobs(jobs){
    console.log(jobs)
    let jobsContainer = document.querySelector(".jobs-container")
    let jobsHTML = "";
    jobs.forEach(job => {
        jobsHTML += `
            <div class="jobs-tile">
                <div class="top">
                    <img src="${job.logo}" alt="">
                    <span class="material-icons more_horiz">more_horiz</span>
                </div>
                <div class="rolename">
                    <span> ${job.roleName}</span>
                </div>
                <div class="description">
                    <span>
                        ${job.requirements.content}
                    </span> 
                </div>
                <div class="buttons">
                    <div class="button apply-now">
                        <a href="${job.applicationLink}" target="_blank">Apply Now</a> 
                    </div>
                    <div class="button">
                        <a href="${job.website}" target="_blank">Message</a> 
                    </div>
                </div>
            </div>
        `
    })

    jobsContainer.innerHTML = jobsHTML;
}

getJobs()
