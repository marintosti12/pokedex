Models
===================

Pokemon

.. code:: python

    class Pokemon(models.Model):
        id = models.IntegerField(primary_key=True)
        name = models.CharField(max_length=255)

Parameters
===================
id => represente l'id du pokemon

name => represente le nom du pokemon