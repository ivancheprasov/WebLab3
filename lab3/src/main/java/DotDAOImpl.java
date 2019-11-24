import org.eclipse.persistence.config.PersistenceUnitProperties;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Component(service = DotDAO.class)
public class DotDAOImpl implements DotDAO {

    private static AtomicInteger current = new AtomicInteger(1);
    private EntityManagerFactory entityManagerFactory;
    private EntityManager entityManager;

    @Activate
    @SuppressWarnings("unchecked")
    protected void activateComponent() {
        @SuppressWarnings("rawtypes")
        Map map = new HashMap();
        map.put(PersistenceUnitProperties.CLASSLOADER, getClass().getClassLoader());
        entityManagerFactory = Persistence.createEntityManagerFactory("postgresql-eclipselink", map);
        entityManager = entityManagerFactory.createEntityManager();
    }

    @Deactivate
    protected void deactivateComponent() {
        entityManager.close();
        entityManagerFactory.close();
        entityManager = null;
        entityManagerFactory = null;
    }

    public DotDAOImpl() {
    }

    public List<Dot> getDots() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Dot> cq = cb.createQuery(Dot.class);
        Root<Dot> root = cq.from(Dot.class);
        CriteriaQuery<Dot> allDots = cq.select(root);
        TypedQuery<Dot> dotTypedQuery = entityManager.createQuery(allDots);
        return dotTypedQuery.getResultList();
    }

    public Optional<Dot> getOptionalDotById(int id) {
        entityManager.getTransaction().begin();
        Dot dot = entityManager.find(Dot.class, id);
        entityManager.getTransaction().commit();
        return Optional.ofNullable(dot);
    }

    public void addDot(Dot newDot) {
        Optional<Dot> dotOptional = getOptionalDotById(newDot.getId());
        Dot dot = dotOptional.orElse(new Dot(current.getAndIncrement()));
        dot.setX(newDot.getX());
        dot.setY(newDot.getY());
        dot.setR(newDot.getR());

        if (dotOptional.isPresent()) {
            entityManager.getTransaction().begin();
            entityManager.merge(dot);
            entityManager.getTransaction().commit();
        } else {
            entityManager.getTransaction().begin();
            entityManager.persist(dot);
            entityManager.getTransaction().commit();
        }
    }

    @Override
    public Dot getDotById(int id) {
        return getOptionalDotById(id).get();
    }

    public void addDots(List<Dot> dotList) {
        dotList.forEach(this::addDot);
    }

    public void deleteDotById(int id) {
        entityManager.getTransaction().begin();
        Dot find = entityManager.find(Dot.class, id);
        entityManager.remove(find);
        entityManager.getTransaction().commit();
    }
}
