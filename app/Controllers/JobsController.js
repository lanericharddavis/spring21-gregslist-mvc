import { ProxyState } from "../AppState.js";
import { jobsService } from "../Services/JobsService.js";


function _draw() {
  let jobs = ProxyState.jobs
  let template = ''
  jobs.forEach(job => {
    template += job.Template
  })
  document.getElementById('jobs').innerHTML = template
}

export default class JobsController {

  constructor() {
    ProxyState.on('jobs', _draw)

    this.getJobs()
  }

  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      console.error(error)
    }
  }

  async createJob() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let newJob = {
        //@ts-ignore
        id: form.id.value,
        //@ts-ignore
        company: form.company.value,
        //@ts-ignore
        jobTitle: form.jobTitle.value,
        //@ts-ignore
        hours: form.hours.value,
        //@ts-ignore
        rate: form.rate.value,
        //@ts-ignore
        description: form.description.value
      }
      await jobsService.createJob(newJob)
      //@ts-ignore
      form.reset()
      $('#new-job-form').modal('hide')
    } catch (error) {
      console.error(error)
    }
  }

  deleteJob(id) {
    try {
      jobsService.deleteJob(id)
    } catch (error) {
      console.error(error)
    }
  }

  applyJob(id) {
    jobsService.applyJob(id)
  }
}