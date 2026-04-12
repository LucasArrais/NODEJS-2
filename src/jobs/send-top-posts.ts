import cron from 'node-cron'
import { makeSendTopPostsDigestUseCase } from '../usecases/factories/make-send-top-posts.js'

export function startTopPostsDigestJob() {
  const cronSchedule = process.env.CRON_SCHEDULE || '0 23 * * *'
  const isEnabled = process.env.ENABLE_CRON_JOB === 'true'

  if (!isEnabled) {
    console.log('[CRON] Job de resumo de posts está desabilitado')
    return
  }

  console.log(`[CRON] Job agendado para rodar no schedule: ${cronSchedule}`)

  cron.schedule(cronSchedule, async () => {
    console.log(`[CRON] Iniciando job de resumo de posts às ${new Date().toISOString()}`)
    
    try {
      const sendTopPostsDigestUseCase = makeSendTopPostsDigestUseCase()
      await sendTopPostsDigestUseCase.execute()
      console.log(`[CRON] Job finalizado com sucesso às ${new Date().toISOString()}`)
    } catch (error) {
      console.error('[CRON] Erro no job de resumo de posts:', error)
    }
  })
}