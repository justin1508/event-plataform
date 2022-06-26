import { format, isPast } from 'date-fns';
import { CheckCircle, Lock } from 'phosphor-react';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';
// import classNames from 'classnames'

interface LessonsProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson({ title, slug, availableAt, type }: LessonsProps) {
  const { slug: slugLesson } = useParams<{ slug: string }>()

  const isLessonAvailable = isPast(availableAt);

  const availableAtFormatted = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", { locale: ptBR })

  const isActiveLesson = slugLesson === slug;

  return (
    <Link to={`/event/lesson/${slug}`} className="group" >
      <span className="text-gray-300">
        {availableAtFormatted}
      </span>

      <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500
      ${isActiveLesson ? 'bg-green-500' : ''}
      `}>
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={`text-sm  font-medium flex items-center gap-2 ${isActiveLesson ? 'text-white' : 'text-blue-500'}`}>
              <CheckCircle size={20} />
              Conteudo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className={`text-xs rounded py-[0.125rem] px-2 text-white border  font-bold ${isActiveLesson ? 'border-white' : 'border-green-300'}`}>
            {type === 'live' ? 'AO VIVO' : 'AULA PRATICA'}
          </span>
        </header>

        <strong className={` mt-5 block ${isActiveLesson ? 'text-white' : 'text-gray-200'}`} >
          {title}
        </strong>
      </div>
    </Link >
  )
}